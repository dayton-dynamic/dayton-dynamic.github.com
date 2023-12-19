#!/usr/bin/env python
# coding: utf-8

# Most basic Pig Latin converter.


VOWELS = 'aeiou'

def piglatin_words(english):
    for word in english.split():
        if word[0] in VOWELS:
            yield word 
        else:
            yield word[1:] + word[0] + 'ay'

def piglatin(english):
    print(' '.join(piglatin_words(english)))



piglatin('Good day, Dayton!')
