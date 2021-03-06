import os

import pandas as pd
import requests
from sqlalchemy import create_engine


def load_data():
    key = os.environ['KEY']
    secret = os.environ['SECRET']
    database_url = os.environ['DATABASE_URL']

    google_api_key = os.environ['GOOGLE_API_KEY']
    google_base_url = "https://maps.googleapis.com/maps/api/geocode/json?address="

    base_url = "http://api.petfinder.com/v2/"
    endpoint = 'oauth2/token'
    url = base_url + endpoint

    data = {
        'grant_type': 'client_credentials',
        'client_id': key,
        'client_secret': secret
    }

    request = requests.post(url, data=data).json()
    accsess_token = request['access_token']

    #  Get Api
    animal_url = "https://api.petfinder.com/v2/animals"
    header = {
        'Authorization': 'Bearer ' + accsess_token}

    query_url = f"{animal_url}?limit=100&page="
    animal_list = []

    j=0
    for i in range(1, 600):
        try:

            if j > 10000:
                break
            print("animal_request: "+str(i))
            animal_request = requests.get(query_url + str(i), headers=header).json()

            for rec in animal_request["animals"]:
                if rec["type"] in ("Cat", "Dog") != None and rec["breeds"]["primary"] != None and rec["age"] != None \
                        and rec["gender"] != None and rec["size"] != None and rec["status"] != None \
                        and rec["contact"]["address"]["address1"] != None and \
                        rec["contact"]["address"]["state"] != None and rec["contact"]["address"]["postcode"] != None and \
                        rec["contact"]["address"]["country"] == "US":

                    full_address = "{0},{1},{2},{3}".format(rec["contact"]["address"]["address1"],
                                                            rec["contact"]["address"]["city"],
                                                            rec["contact"]["address"]["state"],
                                                            rec["contact"]["address"]["postcode"])
                    url = google_base_url + full_address + "&key=" + google_api_key
                    location = requests.get(url).json()["results"][0]["geometry"]["location"]

                    animal = {"id": rec["id"],
                              "organization_id": rec["organization_id"],
                              "type": rec["type"],
                              "breeds": rec["breeds"]["primary"],
                              "colors": rec["colors"]['primary'],
                              "age": rec["age"],
                              "gender": rec["gender"],
                              "size": rec["size"],
                              "coat": rec["coat"],
                              "status": rec["status"],
                              "published_at": rec["published_at"],
                              "status_changed_at": rec["status_changed_at"],
                              "address": rec["contact"]["address"]["address1"],
                              "city": rec["contact"]["address"]["city"],
                              "state": rec["contact"]["address"]["state"],
                              "postcode": rec["contact"]["address"]["postcode"],
                              "lat": location["lat"],
                              "lng": location["lng"]
                              }
                    animal_list.append(animal)
                    j=j+1
                    print("Added to list: " + str(j))
        except Exception as ex:
            print(ex)
            print(animal_request)

    print(len(animal_list))

    animals_df = pd.DataFrame(animal_list)
    limited_filtered_data = animals_df.head(10000)
    print(limited_filtered_data)

    # Connecting to PostgreSQL
    engine = create_engine(database_url)
    limited_filtered_data.to_sql('all_animals', con=engine, if_exists='replace', index=False)


if __name__ == "__main__":
    load_data()
