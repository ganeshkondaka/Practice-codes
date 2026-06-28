from typing_extensions import TypedDict
from openai import OpenAI
from dotenv import load_dotenv
from langgraph.graph import StateGraph, START, END
import requests
import xml.etree.ElementTree as ET

load_dotenv()

client = OpenAI()

class State(TypedDict):
    query : str
    llm_result: str
    weather_data: str
    news_data: str
    classification: str

def chat_bot(state:State):
    query = state['query']
    llm_response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {"role":"user","content":query}
        ]
    )
    result = llm_response.choices[0].message.content
    state["llm_result"] = result

    return state

def classifier(state:State):
    """Use LLM to classify if the question is about weather or news"""
    query = state['query']
    
    classification_prompt = f"""You are a query classifier. Classify the following user query as either 'weather' or 'news'.

WEATHER queries: questions about current weather, temperature, rain, snow, wind, humidity, climate, forecasts, conditions in a location
NEWS queries: questions about current events, headlines, breaking news, politics, business, entertainment, sports news

User Query: {query}

Respond with ONLY the word: weather or news"""
    
    try:
        response = client.chat.completions.create(
            model="gpt-4-mini",
            messages=[
                {"role": "user", "content": classification_prompt}
            ],
            temperature=0  # Use lower temperature for consistent classification
        )
        classification = response.choices[0].message.content.strip().lower()
        
        # Clean up response (in case model adds extra text)
        if 'weather' in classification:
            classification = 'weather'
        elif 'news' in classification:
            classification = 'news'
        else:
            classification = 'news'  # default to news
        
        state["classification"] = classification
    except Exception as e:
        print(f"Classification error: {e}")
        state["classification"] = 'news'  # default to news on error
    
    return state
def get_weather_data(state:State):
    """Fetch weather data from wttr.in API (no API key needed)"""
    try:
        query = state['query'].lower()
        
        # Extract city from query (simple approach - get the last word or common locations)
        common_locations = ['goa', 'mumbai', 'delhi', 'bangalore', 'london', 'new york', 'paris', 'tokyo', 'dubai']
        city = "London"  # default
        
        for location in common_locations:
            if location in query:
                city = location
                break
        
        # If no common location found, try to extract last meaningful word
        if city == "London":
            words = query.split()
            for word in reversed(words):
                if len(word) > 2 and word not in ['what', 'is', 'the', 'current', 'weather', 'in', 'at']:
                    city = word
                    break
        
        url = f"https://wttr.in/{city}?format=%C+%t"
        
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            weather_info = response.text.strip()
            state["weather_data"] = f"Weather in {city.title()}: {weather_info}"
        else:
            state["weather_data"] = "Could not fetch weather data"
    except Exception as e:
        state["weather_data"] = f"Error fetching weather: {str(e)}"
    
    return state

def get_news_data(state:State):
    """Fetch news data from NYTimes RSS feed"""
    try:
        url = "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
        response = requests.get(url, timeout=5)
        
        if response.status_code == 200:
            root = ET.fromstring(response.content)
            # Extract news titles from RSS feed
            headlines = []
            for item in root.findall('.//item')[:5]:  # Get top 5 news
                title = item.find('title')
                if title is not None:
                    headlines.append(title.text)
            
            state["news_data"] = f"NYTimes Top Headlines: {', '.join(headlines)}"
        else:
            state["news_data"] = "Could not fetch news data"
    except Exception as e:
        state["news_data"] = f"Error fetching news: {str(e)}"
    
    return state

def router(state:State):
    """Route to weather_tool or news_tool based on classification"""
    classification = state.get('classification', 'news').lower()
    
    if classification == 'weather':
        return 'weather_tool'
    else:
        return 'news_tool'
graph_builder = StateGraph(State)

graph_builder.add_node('chat_bot', chat_bot)
graph_builder.add_node('classifier', classifier)
graph_builder.add_node('weather_tool', get_weather_data)
graph_builder.add_node('news_tool', get_news_data)

graph_builder.add_edge(START, 'chat_bot')
graph_builder.add_edge('chat_bot', 'classifier')
graph_builder.add_conditional_edges('classifier', router)
graph_builder.add_edge('weather_tool', END)
graph_builder.add_edge('news_tool', END)

graph = graph_builder.compile()

def main():
    user = input('Human --> ')
    
    _state = {
        "query": user,
        "llm_result": None,
        "weather_data": None,
        "news_data": None,
        "classification": None
    }
    
    graph_result = graph.invoke(_state)
    
    print('graph_result--->', graph_result)
    
main()