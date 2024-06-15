# import standard packages
import numpy as np
import pandas as pd
import random

# import visualization packages
import plotly.express as px
import plotly.graph_objects as go

# import distance calculation packages
from geopy.distance import geodesic

# import model packages
from python_tsp.exact import solve_tsp_dynamic_programming

# import sys to get input from app
import sys

# download csv of cities

try:
    df = pd.read_csv('uscities.csv')
except:
    df = pd.read_csv('https://raw.githubusercontent.com/EEliason1/june_code_jam/main/notebooks/uscities.csv')

# create column names to keep
columns = ['city', 'state_id', 'lng', 'lat']

# select columns
df = df[columns]

# re-order columns
df = df[['city', 'state_id', 'lng', 'lat']]
    
# save list for cities
cities_states = {'Denver':'CO', 'Tampa':'FL', 'Atlanta':'GA', 'Seattle':'WA', 'New York':'NY', 'Los Angeles':'CA', 'Chicago':'IL', 'Dallas':'TX'}

# create a list of indexes to keep
keep = []

# loop through cities and states, keeping those that match
for city, state in cities_states.items():
    try:
        keep.append(df[(df['city'] == city) & (df['state_id'] == state)].index[0])
    except:
        print(f'{city} not found in the dataset')

# create a new dataframe with only the cities we want
df = df.loc[keep]

# Reset the index
df.reset_index(drop=True, inplace=True)

# Create new columns to store the distances
for city in cities_states.keys():
    df[city] = np.nan

# Loop through each city
for city in cities_states.keys():
    # Get the coordinates of the current city
    city_coords = (df[df['city'] == city]['lat'].values[0], df[df['city'] == city]['lng'].values[0])

    # Loop through each row in the dataframe
    for i in range(len(df)):
        # Calculate the distance between the city and the row
        row_coords = (df['lat'][i], df['lng'][i])
        distance = geodesic(row_coords, city_coords).miles

        # Add the distance to the dataframe
        df.at[i, city] = distance

# List of all cities
cities = list(cities_states.keys())

# Set colors
ocean = '#CBF3F0'
lake = '#CBF3F0'
river = '#CBF3F0'
land = '#FFBF69'
text_cities = 'Black'
text_distance = '#FFFFFF'
lines = 'black'
marker = '#FF9F1C'
mode = 'plotly_dark' # 'plotly', 'plotly_white', 'plotly_dark', 'ggplot2', 'seaborn', 'simple_white', 'none'

# Set borders
width = 1000
height = 800

# Text positions for labels
text_positions = {
    'Chicago': 'bottom right',
    'Los Angeles': 'bottom left',
    'Dallas': 'top right',
    'Atlanta': 'bottom center',
    'Denver': 'bottom left',
    'Tampa': 'bottom right',
    'Seattle': 'top left',
    'New York': 'top left'
}

# Iterate over the cities_states dictionary and populate cities_numbers with new values to map input from JS to generate a new map
cities_numbers = {}
for index, city in enumerate(cities_states.keys()):
    cities_numbers[city] = index

# Initiate a variable to change the start location based on input from app
start_loc = cities_numbers.get(sys.argv[0], 0) # Defaults to index 0 to avoid error

# Extract the distance matrix generated from the dataframe
distance_matrix = df.drop(columns, axis=1).values

# Adjust the distance matrix to start with the chosen starting point
distance_matrix = np.roll(distance_matrix, -start_loc, axis=0)
distance_matrix = np.roll(distance_matrix, -start_loc, axis=1)

# Initiate a new df that matches the custom start point as index 0
rolled_df = df.reindex(np.roll(df.index, -start_loc, axis=0)).reset_index(drop=True)

# Run the model to get the optimal route from the start point
permutation, distance_optimal = solve_tsp_dynamic_programming(distance_matrix)

# Initiate list of cities based on optimal route at the custom start point
optimal_route = rolled_df.loc[permutation, 'city'].values

# Create the map for the optimal route
fig_optimal = go.Figure()

# Add the cities to the map
for city in optimal_route:
    city_data = df[df['city'] == city]
    if not city_data.empty:
        text_position = text_positions.get(city, 'top right')
        fig_optimal.add_trace(go.Scattergeo(
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

# Add the lines between the cities
for i in range(len(optimal_route) - 1):
    city_data_1 = df[df['city'] == optimal_route[i]]
    city_data_2 = df[df['city'] == optimal_route[i + 1]]
    if not city_data_1.empty and not city_data_2.empty:
        fig_optimal.add_trace(go.Scattergeo(
            lon=[city_data_1['lng'].values[0], city_data_2['lng'].values[0]],
            lat=[city_data_1['lat'].values[0], city_data_2['lat'].values[0]],
            mode='lines',
            line=dict(width=2, color=colors[i % len(colors)]),
            name=f'Leg {i + 1}',
            showlegend=True  # Show only leg names in legend
        ))

# Update the layout
fig_optimal.update_layout(
    title={
        'text': 'Optimal Route',
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
fig_optimal.update_geos(lataxis_range=[25, 50], lonaxis_range=[-125, -65])

# Add label for distance of route
fig_optimal.add_annotation(
    x=0.5,
    y=0.1,
    showarrow=False,
    text=f'Total Distance: {distance_optimal:.2f} miles',
    font=dict(size=20, color=text_distance),
    xref='paper',
    yref='paper'
)

# Set background color
fig_optimal.update_layout(
    plot_bgcolor='rgba(0, 0, 0, 0)',
    paper_bgcolor='rgba(0, 0, 0, 0)',
    font=dict(color='white')
)


# Limit ability to scroll across the map
fig_optimal.update_layout(dragmode=False)

# Show the map
fig_optimal.show()