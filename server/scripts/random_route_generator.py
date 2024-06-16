# import standard packages
import numpy as np
import pandas as pd
import random

# import visualization packages
import plotly.express as px
import plotly.graph_objects as go
import polyline
import googlemaps

# import distance calculation packages
from geopy.distance import geodesic

# Load CSV files

try:
    df = pd.read_csv('cities.csv')
except:
    df = pd.read_csv('https://raw.githubusercontent.com/EEliason1/june_code_jam/main/notebooks/uscities.csv')

try:
    df_distances = pd.read_csv('distances.csv', index_col=0)
except:
    df_distances = pd.read_csv('https://raw.githubusercontent.com/EEliason1/june_code_jam/main/notebooks/distances.csv', index_col=0)

try:
    df_times = pd.read_csv('times.csv', index_col=0)
except:
    df_times = pd.read_csv('https://raw.githubusercontent.com/EEliason1/june_code_jam/main/notebooks/times.csv', index_col=0)

try:    
    df_directions = pd.read_csv('directions.csv', index_col=0)
except:
    df_directions = pd.read_csv('https://raw.githubusercontent.com/EEliason1/june_code_jam/main/notebooks/directions.csv', index_col=0)

# Create cities list
cities = df_distances.columns.tolist()


# save route as list
random_route = []

# loop cities and randomly
while len(cities) > 0:
    current_city = random.choice(cities)
    random_route.append(current_city)
    cities.remove(current_city)

# create a function to calculate the distance of a route
def calculate_distance_time(route):
    total_distance = 0
    total_time = 0
    for i in range(len(route) - 1):
        city = route[i]
        next_city = route[i+1]
        total_distance += df_distances.loc[city, next_city]

        total_time += df_times.loc[city, next_city]

    total_time = round(total_time, 2) # Convert time to hours

    return round(total_distance,2), total_time

# calculate distance and time of random route
distance_random, time_random = calculate_distance_time(random_route)

# show distance and time of random route
# use distance_random variable to print value in miles")
# use time_random to print value in hours")

# Initiate google
gmaps = googlemaps.Client(key='AIzaSyDR5DDYR19EbaSYj8aceLPkoxLq--BsD48')

# Set colors
ocean = '#CBF3F0'
lake = '#CBF3F0'
river = '#CBF3F0'
land = '#FFBF69'
text_cities = 'Black'
text_distance = '#FFFFFF'
marker = '#FF9F1C'
mode = 'plotly_dark'

# Set borders
width = 1000
height = 800

# Create mapping function
def map_route(city_list, title, total_distance, total_time):
    # Create the map
    fig = go.Figure()

    # Define text positions for city labels
    text_positions = {city_list[0]: 'top right', city_list[-1]: 'top left'}  # Adjust as needed

    # Add the cities to the map
    for city in city_list:
        city_data = df[df['city'] == city]
        if not city_data.empty:
            text_position = text_positions.get(city, 'top right')
            fig.add_trace(go.Scattergeo(
                lon=city_data['lng'].values,
                lat=city_data['lat'].values,
                mode='markers+text',
                marker=dict(size=10, color=marker),
                text=city,
                textposition=text_position,
                textfont=dict(color=text_cities),
                name=city,
                showlegend=False  # Hide city names from legend
            ))

    # Change line to a different color for each leg of the route
    colors = px.colors.qualitative.Plotly

    # Add the lines between the cities using the previously stored directions
    for i in range(len(city_list) - 1):
        city = city_list[i]
        other_city = city_list[i + 1]

        directions = df_directions.loc[city, other_city]

        if directions:
            # Decode the polyline from the stored directions
            result = gmaps.directions(
                (df[df['city'] == city]['lat'].values[0], df[df['city'] == city]['lng'].values[0]),
                (df[df['city'] == other_city]['lat'].values[0], df[df['city'] == other_city]['lng'].values[0]),
                mode='driving'
            )
            points = polyline.decode(result[0]['overview_polyline']['points'])
            lats, lons = zip(*points)

            fig.add_trace(go.Scattergeo(
                lon=lons,
                lat=lats,
                mode='lines',
                line=dict(width=2, color=colors[i % len(colors)]),
                name=f'Leg {i + 1}',
                showlegend=True  # Show only leg names in legend
            ))
        else:
            print(f"No result for leg {city} to {other_city}")

    # Update the layout
    fig.update_layout(
        title={
            'text': title,
            'y': 0.85,  # Move the title to just above the map
            'x': 0.5,  # Center the title
            'xanchor': 'center',
            'yanchor': 'top'
        },
        showlegend=True,
        legend=dict(
            y=0.5,  # Position the legend midway down the plot
            yanchor="middle"
        ),
        geo=dict(
            scope='north america',  # restrict the map to the USA
            showland=True,
            showcountries=True,
            showocean=True,
            oceancolor=ocean,
            landcolor=land,
            countrywidth=0.5,
            subunitwidth=0.5,
            showlakes=True,
            lakecolor=lake,
            showsubunits=True,
            showrivers=True,
            rivercolor=river,
        ),
        width=width,  # make the map larger
        height=height,  # make the map larger
        margin=dict(l=10, r=10, t=40, b=10)  # increase top margin for title
    )

    # Restrict map to the US
    fig.update_geos(lataxis_range=[25, 50], lonaxis_range=[-125, -65])

    # Add annotation for distance of route
    fig.add_annotation(
        x=0.5,
        y=0.1,
        showarrow=False,
        text=f'Total Distance: {total_distance} miles',
        font=dict(size=20, color=text_distance),
        xref='paper',
        yref='paper'
    )

    # Add annotation for time of route
    fig.add_annotation(
        x=0.5,
        y=0.05,
        showarrow=False,
        text=f'Total Time: {total_time} hours',
        font=dict(size=20, color=text_distance),
        xref='paper',
        yref='paper'
    )

    # Set background color
    fig.update_layout(
        plot_bgcolor='rgba(0, 0, 0, 0)',
        paper_bgcolor='rgba(0, 0, 0, 0)',
        font=dict(color='white')
    )

    # Limit ability to scroll across the map
    fig.update_layout(dragmode=False)

    return fig

# Show map
fig_random = map_route(random_route, 'Random Route',distance_random, time_random)

# Show the map
# fig_random.show()

# call the fig_random variable for the randomly generated map. code can be looped to generate a new route every x seconds in JS