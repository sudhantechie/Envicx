require 'sinatra'
require 'json'

set :public_folder, 'public'

# POST route to calculate carbon footprint and water usage
post '/calculate' do
  content_type :json

  # Parse the JSON data
  data = JSON.parse(request.body.read)

  travel = data['travel']
  diet = data['diet']
  energy = data['energy']
  household = data['household']
  renewable = data['renewable']
  recycling = data['recycling']
  vehicle = data['vehicle']
  water = data['water']
  waste = data['waste']
  electricity_source = data['electricitySource']

  # Carbon Footprint Calculation
  carbon_footprint = (travel * 0.2 + diet * 1.5 + energy * 0.5) / household
  carbon_footprint *= (100 - renewable) / 100.0

  case vehicle
  when 'electric'
    carbon_footprint -= 2
  when 'hybrid'
    carbon_footprint -= 1
  when 'gas'
    carbon_footprint += 2 
  when 'diesel'
    carbon_footprint += 3 
  end

  # Water Usage Calculation
  water_usage = (travel * 5 + diet * 20 + energy * 10) / household
  water_usage *= 1 - (recycling / 10.0)
  water_usage += water 

  # Waste Generation Impact
  waste_impact = waste * 0.2

  if electricity_source == 'nonRenewable'
    carbon_footprint += 5  # Increase footprint for non-renewable electricity
  end

  # Suggestions based on input
  suggestions = []

  if travel > 50
    suggestions << "Reduce your daily travel distance or switch to public transport."
  elsif travel > 20
    suggestions << "Consider using a bicycle or walking for short trips."
  end

  if vehicle == 'gas' || vehicle == 'diesel'
    suggestions << "Consider switching to an electric or hybrid vehicle to reduce your carbon footprint."
  end

  if water > 100
    suggestions << "Reduce your water consumption by adopting water-saving practices."
  end

  if waste > 5
    suggestions << "Try reducing waste by buying products with less packaging and composting."
  end

  { 
    carbonFootprint: carbon_footprint,
    waterUsage: water_usage,
    suggestions: suggestions
  }.to_json
end

# Route to serve the HTML page
get '/' do
  File.read(File.join('public', 'index.html'))
end
