import http.server
import os

os.chdir("/Users/ceanes/Library/CloudStorage/OneDrive-WPPCloud/Desktop/cody-eanes-portolio")

handler = http.server.SimpleHTTPRequestHandler
server = http.server.HTTPServer(("0.0.0.0", 3000), handler)
print("Serving on http://localhost:3000")
server.serve_forever()
