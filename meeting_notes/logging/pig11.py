#!/usr/bin/env python
# coding: utf-8

# Proper Python logging
# Part 5: Explicit handlers (buggy)

import string 
import logging
import sys

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())

# Note that we're switching `logging` to `logger` below

# Nothing is happening here b/c the new handler has the
# default level of WARNING... even though the logger 
# overall does not 


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