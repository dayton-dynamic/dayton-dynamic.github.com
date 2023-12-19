#!/usr/bin/env python
# coding: utf-8

# Proper Python logging
# Part 3: Changing log destination

import string 
import logging
import sys



logging.basicConfig(filename='pig.log', 
                    filemode='w', 
                    level=logging.INFO)


VOWELS = 'aeiou'

def punctuation_stripped(word):
    core_word = word.rstrip(string.punctuation)
    punctuation = word[:len(core_word)]
    logging.info(f"returning from function `punctuation_stripped`:")
    logging.info(f"{core_word=}")
    logging.info(f"{punctuation=}")
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