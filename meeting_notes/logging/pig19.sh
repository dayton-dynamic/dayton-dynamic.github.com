#! /usr/bin/bash

# ic.sh should be copied locally 
# from https://github.com/jtplaarj/IceCream-Bash

source ic.sh

pig_latin() {
  local word="$1"
  local first_char="${word:0:1}"

  ic first_char
  
  if [[ $first_char =~ [aeiouAEIOU] ]]; then
    echo "${word}yay"
  else
    echo "${word:1}${first_char}ay"
  fi
}

sentence_to_piglatin() {
  local sentence="$1"
  local result=""

  for word in $sentence; do
    result+=" $(pig_latin $word)"
  done

  echo "$result"
}

# Example usage:
echo "Enter a sentence:"
read input_sentence

converted_sentence=$(sentence_to_piglatin "$input_sentence")
echo "Pig Latin: $converted_sentence"

