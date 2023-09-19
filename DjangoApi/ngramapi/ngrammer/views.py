from django.shortcuts import render
from django.http import HttpResponse 
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

import nltk
nltk.download('punkt')
from nltk.util import ngrams

def extract_ngrams(data, num):
    n_grams = ngrams(nltk.word_tokenize(data), num)
    return [ ' '.join(grams) for grams in n_grams]



# Create your views here.
@csrf_exempt
def home(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            ans1=  extract_ngrams(data['Sentence1'], data['Ngram1']) 
            ans2=  extract_ngrams(data['Sentence2'], data['Ngram1'])

            response_data = {
                'ans1':ans1,
                'ans2':ans2,
            }
            return JsonResponse(response_data)
        except json.JSONDecodeError:
            error_response = {
                'status': False,
                'error_message': 'Invalid JSON data in the request.',
            }
            return JsonResponse(error_response, status=400)
    else:
        # Handle other HTTP methods (GET, PUT, DELETE, etc.) if needed
        error_response = {
            'status': False,
            'error_message': 'Invalid HTTP method. This view only accepts POST requests.',
        }
        return JsonResponse(error_response, status=405)


