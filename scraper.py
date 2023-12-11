import requests
from bs4 import BeautifulSoup

# Specify the URL of the website you want to scrape
url = 'https://liquipedia.net/dota2/Portal:Heroes'

file= open("image_urls.json","w")
file.write("[")

# Send a GET request to the URL
response = requests.get(url)
imageCounts = 0
index = 0
# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Parse the HTML content of the page
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all <li> elements
    li_elements = soup.find_all('li')

    # Iterate through each <li> element
    for li in li_elements:
        # Find the inner <a> element within each <li>
        anchor_element = li.find('a')

        # Check if an <a> element is found
        if anchor_element:
            # Find the inner <img> element within each <a>
            img_element = anchor_element.find('img')

            # Check if an <img> element is found
            if img_element and 'ESL_One' not in img_element.get('src'):
                index+=1
                imageUrl = img_element.get('src')
                if index==130:
                    file.write('{"url":"'+imageUrl+'"}]')
                elif index>6: 
                    file.write('{"url":"'+imageUrl+'"},')
                imageCounts+=1
file.close()
print(imageCounts)