#!/usr/bin/env python
# coding: utf-8

# loguru: remove default handler

import string 
from loguru import logger
import sys

logger.remove()
logger.add(sys.stderr, level="INFO")
logger.add('pig_{time}.log', format="{time} {level} {message}", level='DEBUG')

# See more features: https://loguru.readthedocs.io/en/stable/overview.html

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