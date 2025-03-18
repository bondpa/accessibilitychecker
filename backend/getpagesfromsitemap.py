import requests
from bs4 import BeautifulSoup

def get_urls_from_sitemap(sitemap_url):
    """
    Takes in a URL to a sitemap and returns a list of URLs to the site's pages.
    If the sitemap contains a list of sitemaps, it collects URLs from all of them.
    
    Args:
    sitemap_url (str): The URL to the sitemap.
    
    Returns:
    list: A list of URLs to the site's pages.
    """
    def fetch_sitemap(url):
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'xml')
        return soup

    def parse_sitemap(soup):
        urls = [element.text for element in soup.find_all('loc')]
        return urls

    sitemap_soup = fetch_sitemap(sitemap_url)
    urls = parse_sitemap(sitemap_soup)

    # Check if the sitemap is an index of sitemaps
    if sitemap_soup.find_all('sitemap'):
        all_urls = []
        for sitemap in urls:
            sub_sitemap_soup = fetch_sitemap(sitemap)
            all_urls.extend(parse_sitemap(sub_sitemap_soup))
        return all_urls
    
    return urls