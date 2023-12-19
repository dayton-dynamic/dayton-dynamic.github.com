#!/usr/bin/env python
# coding: utf-8

# Proper Python logging
# Part 5: Explicit handlers (buggy)

import string 
import logging
import sys

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
handler2 = logging.StreamHandler()
handler2.setLevel(logging.INFO)
logger.addHandler(handler2)
handler3 = logging.FileHandler('pig.log', mode='w')
handler3.setLevel(logging.DEBUG)
logger.addHandler(handler3)

# The level set in the logger determines which severity of messages 
# it will pass to its handlers. The level set in each handler 
# determines which messages that handler will send on.

VOWELS = 'aeiou'

def punctuation_stripped(word):
    logger.info(f"running `punctuation_stripped` on {word}:")
    core_word = word.rstrip(string.punctuation)
    punctuation = word[:len(core_word)]
    logger.debug(f"{core_word=}")
    logger.debug(f"{punctuation=}")
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