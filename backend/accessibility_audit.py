from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from axe_selenium_python import Axe
import pandas as pd

def fetch_accessibility_issues_with_tags(url):
    """
    Fetches accessibility issues of a webpage using axe-tools and returns a Pandas DataFrame.
    Each tag is represented as a separate column with True/False values.
    
    Parameters:
        url (str): The URL of the webpage to audit.
        
    Returns:
        pd.DataFrame: A DataFrame containing all accessibility violations reported by axe-tools,
                      with tag columns represented as True/False.
    """
    # Set up Selenium WebDriver
    service = Service('path/to/chromedriver')  # Update with the path to your chromedriver
    driver = webdriver.Chrome(service=service)
    driver.get(url)
    
    # Initialize Axe for accessibility testing
    axe = Axe(driver)
    axe.inject()  # Inject axe-core JavaScript into the page
    results = axe.run()
    axe.write_results(results, 'axe_results.json')  # Save results to a file (optional)
    driver.quit()

    # Process results
    violations = results['violations']

    # Build initial DataFrame
    data = []
    all_tags = set()  # Collect all unique tags
    for violation in violations:
        for node in violation['nodes']:
            row = {
                'id': violation['id'],
                'impact': violation['impact'],
                'description': violation['description'],
                'help': violation['help'],
                'html': node['html'],
                'target': node['target'],
                'tags': violation['tags']
            }
            data.append(row)
            all_tags.update(violation['tags'])  # Collect unique tags

    # Convert to DataFrame
    df = pd.DataFrame(data)

    # Expand tags into separate columns
    for tag in all_tags:
        df[tag] = df['tags'].apply(lambda tags: tag in tags)

    # Drop the 'tags' column as it is now redundant
    df = df.drop(columns=['tags'])
    
    return df