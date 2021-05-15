---
layout: post
title:  "May 2021: Proper Python packaging" 
date:   2021-05-13 19:00:00 -0400
categories: meeting
---

# Online Meeting 

Join us at 7 PM EDT on the PyFri Discord channel, [discord.gg/9SgTh3T](https://discord.gg/9SgTh3T), and click on the 
General voice chat link.  You may need to install the Discord desktop app rather than just using 
the web interface.


## Topic: Proper Python Packaging 

There is absolutely no shame in slapping together a one-file script and running it with 
`python myscript.py`.  Often that's exactly the right thing to do.

But sometimes you want to package up code in a way that makes it easy to include in other 
code - yours or other people's.  That's what Python packages are for, and writing a professional-grade 
package includes addressing several aspects like testing, documentation, dependency specification, 
and publishing.  The state of the art in Python packaging keeps evolving, and consensus is finally 
settling toward a common set of best practices.  Even if you don't use them all, getting a look at 
them will help you write more solid and reusable code.

As usual, bring your grab bag of questions, thoughts, news, and 
projects in or about any language to throw in the soup.  We always have a good discussion.

## Meeting notes 

A plain `.py` file is a "module"; adding an `__init__.py` file 
(usually empty, but not necessarily) makes that directory a 
package, and any modules in it can be imported via the package.
So, if you have 

  foo.py
  bar/
    __init__.py
    baz.py 

Then you should be able to 

  import foo 
  import bar.baz

... well, if you're in the directory containing foo.py bar. 
To make it possible to install your package in your Python 
site-packages directory (or, better, your virtual environment) -
and ultimately to publish your package to the 
[PyPI](https://pypi.org/) package index, so others can `pip install` 
it, there's more you need to do.

These notes are "opinionated" - it's definitely not the only 
way, but in my judgement it's the best combination of up-to-date
and easy.

### Creating your package 

Install [poetry](https://python-poetry.org/) 

create a new project with 

  `poetry install awesome-ddl-project` 

Check `awesome-ddl-project/pyproject.toml` - if you want 
a different version than the one poetry wrote out, edit 
it.  For example, I changed

  [tool.poetry.dependencies]
  python = "^3.7"

  to 

  [tool.poetry.dependencies]
  python = "^3.9"

Next I need to run 

  `poetry config virtualenvs.create true --local` 

... but that's to override a poetry config setting on my 
system - for you, the default will do.

Now type 

  `poetry shell` 

And start writing your package.  If your package has 
requirements to import from outside the Python Standard 
Library, use 

  `poetry add the-project-i-need` 

... and it will both install them in your virtual environment 
and write them into pyproject.toml.

Write some tests in tests/ and run them with 

  `pytest` 

Set up an account at [test-pypi](https://test.pypi.org/).

Now 

  poetry build
  poetry config repositories.test-pypi https://test.pypi.org/
  poetry publish -r test-pypi

... and, hopefully, you 

Now you can repeat the process for non-test PyPI itself.

Feel free to bring your project to a PyFri if you'd like some 
realtime help!

### Even more techniques, briefly mentioned 

- [black](https://pypi.org/project/black/) for automatically imposing a consistent format
- [flake8](https://flake8.pycqa.org/en/latest/) for nagging you about 
possible weaknesses in your coding style
- [sourcery](https://sourcery.ai/) for suggesting "Pythonic" code 
improvements
- [tox](https://pypi.org/project/tox/) for running your tests in multiple Python versions
- [Git hooks](https://githooks.com/) to run tools like automatically 
every time you commit 
- Continuous integration tools like TravisCI and CircleCI to run 
them on a server when new commits are pushed to Github
