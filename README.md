# Dayton Dynamic Languages
This is the website for the Dayton Dynamic Languages group in Dayton, OH.

## Install Dependencies

Install the dependencies with bundler

```
$ gem install bundler
$ bundle install
```

If installation fails due to Nokogiri, refer to the [installation documents](http://www.nokogiri.org/tutorials/installing_nokogiri.html).

## Run the Server

The server can be run locally using Jekyll

```
$ bundle exec jekyll serve --config _config_dev.yml
```

## Create a new meeting
Meetings are posts that use the ```meeting``` tag.

Create a new post with the following YAML frontmatter
```
---
layout: post
title:  "We have a new meeting!"
date:   2016-09-16 21:28:07 -0400
categories: meeting
---
// Your meeting text here

```

## Deploy to Production
This configuration is intented to be an organization homepage and as such *should* build and deploy directly by pushing to the master branch.