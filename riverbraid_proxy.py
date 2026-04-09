# Riverbraid-Interface-Gold v1.5.0 | Deterministic Proxy
import os
import json
from flask import Flask, request, jsonify
from riverbraid_guard import RiverbraidGuard # Imported from Harness

app = Flask(__name__)
guard = RiverbraidGuard("constitution.threshold.json")

@app.route('/v1/chat/completions', methods=['POST'])
def proxy_completion():
    data = request.json
    user_query = data.get('messages', [{}])[-1].get('content', '')
    
    # Pre-Processing: Input Sanitization
    # (Governance layer could block specific prompts here)
    
    # Forward to the real LLM (Standardized endpoint)
    # In a real scenario, this forwards to os.getenv('REAL_LLM_ENDPOINT')
    # For this spec, we simulate the 'Guard' wrapping the response.
    
    # Post-Processing: Output Verification
    # We apply the guard's validate_io to the mock/real response
    mock_llm_response = {"text": "Verified Response", "new_root": "de2062..."}
    
    audit_result = guard.validate_io(user_query, mock_llm_response)
    
    if audit_result['status'] == 'HALT':
        return jsonify({"error": "GOVERNANCE_VIOLATION", "detail": audit_result['reason']}), 403

    return jsonify({
        "choices": [{"message": {"content": mock_llm_response['text']}}],
        "riverbraid_meta": {
            "step": audit_result['step'],
            "root": audit_result['root']
        }
    })

if __name__ == '__main__':
    app.run(port=8080)
