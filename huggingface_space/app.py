import gradio as gr
from gradio_client import Client
import sys
from urllib.parse import urlparse
import json

# Logging setup
print("Starting app...", flush=True)

# Initialize Client for the upstream model
# This connects to the actual AI engine
scan_client = None
try:
    print("Connecting to upstream AI Shield...", flush=True)
    scan_client = Client("https://jasonhan888-my-url-scanner1.hf.space")
    print("Connected to AI Shield successfully!", flush=True)
except Exception as e:
    print(f"CRITICAL ERROR connecting to upstream model: {e}", file=sys.stderr, flush=True)

def predict_url(url):
    """
    Predicts the category of a given URL by calling the upstream AI model.
    """
    if not scan_client:
        return {"error": "Upstream AI model is not connected."}

    if not url:
        return {"error": "No URL provided"}
        
    try:
        # Call the upstream space
        result = scan_client.predict(
            url,
            api_name="/predict"
        )
        
        # Return the raw result directly to the frontend for processing
        return result
        
    except Exception as e:
        print(f"Prediction error: {e}", file=sys.stderr, flush=True)
        return {"error": str(e)}
        
    except Exception as e:
        print(f"Prediction error: {e}", file=sys.stderr, flush=True)
        return {"error": str(e)}

# create a Gradio interface
iface = gr.Interface(
    fn=predict_url,
    inputs=gr.Textbox(label="URL", placeholder="Enter URL to scan..."),
    outputs=gr.JSON(label="Analysis Result"),
    title="DeepCheck PWA Backend",
    description="Backend proxy for DeepCheck PWA. Forwards requests to AI/Shield engine."
)

if __name__ == "__main__":
    iface.launch()
