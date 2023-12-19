#!/usr/bin/env python
# coding: utf-8

# Pig latin - ending punctuation moved



import string 
import collections
VOWELS = 'aeiou'

def punctuation_stripped(word):
    core_word = word.rstrip(string.punctuation)
    punctuation = word[:len(core_word)]
    return (core_word, punctuation)


def piglatin_words(english):
    for raw_word in english.split():
        word, punctuation = punctuation_stripped(raw_word)
        if word[0] in VOWELS:
            yield word 
        else:
            yield word[1:] + word[0] + 'ay'

def piglatin(english):
    print(' '.join(piglatin_words(english)))


piglatin('Good day, Dayton!')