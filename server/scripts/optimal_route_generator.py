# import standard packages
import numpy as np
import pandas as pd
import random

# import visualization packages
import plotly.express as px
import plotly.graph_objects as go
import polyline
import googlemaps

# Import TSP tools
import random
import itertools
import math

# import distance calculation packages
from geopy.distance import geodesic

# import model packages
from python_tsp.exact import solve_tsp_dynamic_programming

# import sys to get input from app
import sys

# download csv of cities

try:
    df = pd.read_csv('cities.csv')
except:
    df = pd.read_csv('https://raw.githubusercontent.com/EEliason1/june_code_jam_express/main/server/scripts/uscities.csv')

try:
    df_distances = pd.read_csv('distances.csv', index_col=0)
except:
    df_distances = pd.read_csv('https://raw.githubusercontent.com/EEliason1/june_code_jam_express/main/server/scripts/distances.csv', index_col=0)

try:
    df_times = pd.read_csv('times.csv', index_col=0)
except:
    df_times = pd.read_csv('https://raw.githubusercontent.com/EEliason1/june_code_jam_express/main/server/scripts/times.csv', index_col=0)

try:    
    df_directions = pd.read_csv('directions.csv', index_col=0)
except:
    df_directions = pd.read_csv('https://raw.githubusercontent.com/EEliason1/june_code_jam_express/main/server/scripts/directions.csv', index_col=0)

# Create cities list
cities = df_distances.columns.tolist()

# Initiate google
gmaps = googlemaps.Client(key='AIzaSyDR5DDYR19EbaSYj8aceLPkoxLq--BsD48')

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

# Create timestamp to calculate how long it takes to find the optimal route
start_time = pd.Timestamp.now()

# Target city
if sys.argv[0] not in cities:
    city = 'Tampa'
else:
    city = sys.argv[0] 

# Remaining cities
remaining_cities = cities.copy()
remaining_cities.remove(city)

# determine the number of possible routes
num_possible_routes = math.factorial(len(remaining_cities))

# Generate all permutations of remaining cities
permutations = itertools.permutations(remaining_cities)

# Initialize list to store all unique routes
all_routes = []

# Iterate through permutations and append unique routes
for perm in permutations:
    route = [city] + list(perm)
    if route not in all_routes:
        all_routes.append(route)
    if len(all_routes) >= num_possible_routes:
        break

# Store the best route
best_route = []
best_distance = np.inf

# Iterate through all routes
for route in all_routes:
    total_distance = 0
    for i in range(len(route) - 1):
        city = route[i]
        next_city = route[i + 1]
        total_distance += df_distances.loc[city, next_city]
    if total_distance < best_distance:
        best_distance = total_distance
        best_route = route

# Ending timestamp
end_time = pd.Timestamp.now()

# Calculate difference between start and end time
time_diff = end_time - start_time

# Convert time difference to seconds
time_diff = time_diff.total_seconds()

# Print time difference
# print(f"Time to find optimal route: {time_diff}")

# Show best route
best_route

# Calculate distance and time of optimal route
distance_optimal_shortest, time_optimal_shortest = calculate_distance_time(best_route)

# Show distance of optimal route
# print(f"Optimal shortest route distance: {distance_optimal_shortest} miles")

# Show time of optimal route
# print(f"Optimal shortest route time: {time_optimal_shortest} hours")

# Show map
fig_optimal_shortest = map_route(best_route, 'Optimal Route',distance_optimal_shortest, time_optimal_shortest)

# Show the map
# fig_optimal_shortest.show()

# For circular route. Reinitiate variables.
remaining_cities = cities.copy()
remaining_cities.remove(city)

# determine the number of possible routes
num_possible_routes = math.factorial(len(remaining_cities))

# Generate all permutations of remaining cities
permutations = itertools.permutations(remaining_cities)

# Initialize list to store all unique routes
all_routes = []

# Iterate through permutations and append unique routes
for perm in permutations:
    route = [city] + list(perm) + [city]
    if route not in all_routes:
        all_routes.append(route)
    if len(all_routes) >= num_possible_routes:
        break

# Store the best route
best_route = []
best_distance = np.inf

# Iterate through all routes
for route in all_routes:
    total_distance = 0
    for i in range(len(route) - 1):
        city = route[i]
        next_city = route[i + 1]
        total_distance += df_distances.loc[city, next_city]
    if total_distance < best_distance:
        best_distance = total_distance
        best_route = route

# Ending timestamp
end_time = pd.Timestamp.now()

# Calculate difference between start and end time
time_diff = end_time - start_time

# Convert time difference to seconds
time_diff = time_diff.total_seconds()

# Print time difference
# print(f"Time to find optimal route: {time_diff}")

# Take off last city
best_route = best_route[:-1]

# Calculate distance and time of optimal route
distance_optimal_circular, time_optimal_circular = calculate_distance_time(best_route)

# Show distance of optimal route
# print(f"Optimal circular route distance: {distance_optimal_circular} miles")

# Show time of optimal route
# print(f"Optimal circular route time: {time_optimal_circular} hours")

# Show map
fig_optimal_circular = map_route(best_route, 'Optimal Route',distance_optimal_circular, time_optimal_circular)

# Show map
# fig_optimal_circular.show()