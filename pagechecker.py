from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from axe_selenium_python import Axe
import json

def check_wcag_accessibility(url):
    # Set up the WebDriver (assuming Chrome)
    service = Service('./chromedriver')  # Update with the path to your chromedriver
    driver = webdriver.Chrome(service=service)
    
    # Open the URL
    driver.get(url)
    
    # Initialize Axe
    axe = Axe(driver)
    
    # Inject axe-core javascript into the page
    axe.inject()
    
    # Run accessibility checks
    results = axe.run()
    
    # Close the WebDriver
    driver.quit()
    
    return results['violations']

# Example usage
if __name__ == "__main__":
    url = 'https://www.w3.org/WAI/demos/bad/before/home.html'
    issues = check_wcag_accessibility(url)
    with open('issues.json', 'w', encoding='utf-8') as f:
        json.dump(issues, f, ensure_ascii=False, indent=4)
    # print(json.dumps(issues, indent=2))