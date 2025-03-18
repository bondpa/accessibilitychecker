from fastapi import FastAPI
from pagechecker import check_wcag_accessibility
from getpagesfromsitemap import get_urls_from_sitemap
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*",  # Allows all origins
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/check-webpage/")
async def check_webpage(url: str):
    # print(url)
    # url = 'https://www.w3.org/WAI/demos/bad/before/home.html'
    issues = check_wcag_accessibility(url)
    return {"message": "Checking webpage for accessibility issues", "url": url, "issues": issues}

@app.get("/get-pages-from-sitemap/")
async def get_pages_from_sitemap(url: str):
    urls = get_urls_from_sitemap(url)
    print(urls)
    return urls