import requests

def get_profiles():
    URL = "https://graph.facebook.com/117417339643049?fields=friends{picture.type(large),name}&access_token=EAAJtdKMEnD4BAGlGJZBsIp6a73oA4oZC3fyuKYDBQiPNO0uNyEU2hUhDHzCOeAfbtTJMdYpTWNl0zhcHhiC3qzzFZCZASGuaAJDziMHLoxke2Ipw89t8TJ0CF2HLyfG4dElzno6GfiAMoXShPY0KdVGQPzZBxe1ZBtTlkkHN8925ZBMeSM7GcPG"

    response = requests.get(url=URL)
    friends_profile = response.json()['friends']['data']

    profile_images = {}
    for friend in friends_profile:
        profile_images[friend['name']] = friend['picture']['data']['url']

    for name, image_url in profile_images.items():
        profile_images[name] = requests.get(image_url).content

    return profile_images
