#!/usr/bin/env python
# coding: utf-8

# icecream

# https://github.com/gruns/icecream
# Also: easier to remove

import string 
from icecream import ic

VOWELS = 'aeiou'

def punctuation_stripped(word):
    ic()
    ic(word)
    core_word = word.rstrip(string.punctuation)
    punctuation = word[:len(core_word)]
    ic(core_word)
    ic(punctuation)
    return (core_word, punctuation)


def piglatin_words(english):
    for raw_word in english.split():
        word, punctuation = punctuation_stripped(raw_word)
        if word[0] in VOWELS:
            yield f"{word}{punctuation}" 
        else:
            yield f"{word[1:]}{word[0]}ay{punctuation}"

def piglatin(english):
    print(' '.join(piglatin_words(english)))


piglatin('Good day, Dayton!')