export const FinalTripPlannerPrompt = `Generate a detailed Travel Plan with the given details. 
Requirements:
- Provide hotel options (name, address, price, image URL, geo coordinates, rating, description).
- Provide a full itinerary with day-wise plans, places to visit, details, geo coordinates, address, ticket pricing, travel time, and best time to visit.
- Reply with strict JSON only (no explanations, no markdown, no code fences).

Return STRICT JSON only.
Schema:
{{
  "trip_plan": {{
    "destination": "{{destination}}",
    "duration": "{{duration}}",
    "origin": "{{origin}}",
    "budget": "{{budget}}",
    "group_size": "{{group_size}}",
    "hotels": [
      {{
        "hotel_name": "{{hotel_name}}",
        "hotel_address": "{{hotel_address}}",
        "hotel_image_url": "{{hotel_image_url}}",
        "price_per_night": "{{price_per_night}}",
        "geo_coordinates": {{
          "latitude": {{latitude}},
          "longitude": {{longitude}}
        }},
        "rating": "{{rating}}",
        "description": "{{description}}"
      }}
    ],
    "itinerary": [
      {{
        "dayNumber": "{{dayNumber}}",
        "dayPlanShortDescription": "{{dayPlanShortDescription}}",
        "dayPlanLongDescription": "{{dayPlanLongDescription}}",
        "best_time_to_visit": "{{best_time_to_visit}}",
        "activities": [
          {{
            "place_name": "{{place_name}}",
            "place_details": "{{place_details}}",
            "place_image_url": "{{place_image_url}}",
            "geo_coordinates": {{
              "latitude": {{place_latitude}},
              "longitude": {{place_longitude}}
            }},
            "place_address": "{{place_address}}",
            "ticket_pricing": "{{ticket_pricing}}",
            "time_travel_each_location": "{{time_travel_each_location}}",
            "best_time_to_visit": "{{activity_best_time}}"
          }}
        ]
      }}
    ]
  }}
}}`;