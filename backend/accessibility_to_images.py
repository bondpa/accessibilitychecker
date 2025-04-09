import json
import os
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw  # Import the Pillow library for image manipulation
import time

def create_images_from_accessibility_json(json_file, output_dir="images", padding=100, border_width=5, border_color="red"):
    """
    Parses a JSON file containing accessibility issues, extracts related HTML,
    and creates larger, contextualized image files using Playwright,
    with a red border around the element with the accessibility issue.

    Args:
        json_file (str): Path to the JSON file.
        output_dir (str): Directory to save the generated images.
        padding (int): Padding around the element in pixels for the screenshot.
        border_width (int): Width of the red border in pixels.
        border_color (str): Color of the border (e.g., "red", "blue", "#FF0000").
    """

    try:
        with open(json_file, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: File not found: {json_file}")
        return
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in file: {json_file}")
        return

    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    issue_count = 0
    if 'issues' not in data:
        print("Error: 'issues' key not found in data.")
        return

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        for issue in data['issues']:
            if 'nodes' not in issue:
                print("Warning: 'nodes' key not found in issue.")
                continue

            for node in issue['nodes']:
                if 'any' not in node:
                    continue

                for any_item in node['any']:
                    if 'relatedNodes' not in any_item:
                        continue

                    for related_node in any_item['relatedNodes']:
                        if 'html' not in related_node or 'target' not in related_node:
                            print("Warning: 'html' or 'target' key not found in related_node.")
                            continue

                        html_content = related_node['html']
                        target = related_node['target']

                        try:
                            # Load the webpage
                            page.goto(data['url'])

                            # Find the element using the target selector
                            if target and len(target) > 0:
                                element = page.locator(target[0]).first # Take the first target

                                # Scroll the element into view
                                element.scroll_into_view_if_needed()
                                time.sleep(0.5)  # Wait for the element to scroll into view

                                # Get the element's bounding box
                                bounding_box = element.bounding_box()

                                if bounding_box:
                                    # Calculate the screenshot region with padding
                                    left = max(0, int(bounding_box['x']) - padding)
                                    top = max(0, int(bounding_box['y']) - padding)
                                    right = int(bounding_box['x'] + bounding_box['width'] + padding)
                                    bottom = int(bounding_box['y'] + bounding_box['height'] + padding)

                                    # Take a full-page screenshot
                                    full_screenshot_path = os.path.join(output_dir, f"full_page_{issue_count}.png")
                                    page.screenshot(path=full_screenshot_path, full_page=True)

                                    # Open the full-page screenshot using Pillow
                                    full_screenshot = Image.open(full_screenshot_path)

                                    # Crop the image to the calculated region
                                    cropped_image = full_screenshot.crop((left, top, right, bottom))

                                    # Draw a red border around the element
                                    draw = ImageDraw.Draw(cropped_image)
                                    element_left = int(bounding_box['x']) - left
                                    element_top = int(bounding_box['y']) - top
                                    element_right = element_left + int(bounding_box['width'])
                                    element_bottom = element_top + int(bounding_box['height'])
                                    draw.rectangle((element_left, element_top, element_right, element_bottom), outline=border_color, width=border_width)


                                    # Save the cropped image
                                    cropped_screenshot_path = os.path.join(output_dir, f"issue_{issue_count}.png")
                                    cropped_image.save(cropped_screenshot_path)
                                    print(f"Screenshot saved: {cropped_screenshot_path}")

                                    # Clean up the full-page screenshot
                                    os.remove(full_screenshot_path)
                                else:
                                    print("Warning: Could not get bounding box for element.")

                            else:
                                print("Warning: No target selector found for related node.")

                        except Exception as e:
                            print(f"Error capturing screenshot: {e}")

                        issue_count += 1

        browser.close()

# Example usage:
if __name__ == "__main__":
    create_images_from_accessibility_json("accessibility_issues.json", "images", padding=100, border_width=5, border_color="red")