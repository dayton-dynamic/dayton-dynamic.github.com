---
layout: default
---

# Welcome to DDL!

## About Us

The Dayton Dynamic Language User Group is primarily focused on, as
you can tell by the name, dynamic languages. If you're interested
in Ruby (including Rails), Python (including Django), PHP, Perl,
Javascript, Scheme, Lisp, Smalltalk, etc, this is probably the place
for you. We try not to talk specifically about things like C
and Java, but there are no hard and fast rules (especially if
you're comparing them to a dynamic language).

The meetings are very informal. We usually don't have any
formal presentations, but people frequently show code that they're
working on. The flow of the meeting tends to meander, so if you're
interested in something specific, you should speak up!
).

We are a Special Interest Group (SIG) of the [Dayton Microcomputer 
Association](http://dma1.org/).  See other DMA SIG meetings
at [Meetup](http://www.meetup.com/Dayton-Microcomputer-Association-Meetup/
<a name="#next-meeting-topic"></a>

## Upcoming Meetings

{% assign curDate = site.time | date: '%s' %}
{% assign meetings = site.categories.meeting | sort: "date" | reversed %}
{% for meeting in meetings %}
    {% assign meetingDate = meeting.date | date: '%s' %}
    {% if meetingDate >= curDate %}

### [{{ meeting.title | escape }}]({{ meeting.url | prepend: site.baseurl }})

#### {{ meetingDate | date: "%B %d, %Y" }}

{{ meeting.content }}

    {% endif %}
{% endfor %}

<a name="ml"></a>

## PyFri@WBI: Python self-study meetups

Together with [Tec^Edge](http://wbi-icc.com/centers-services/tecedge-icc), 
we're having an informal weekly lunchtime meeting
for folks learning Python.  No program, just come to share questions with each 
other, show off what you've been working on, and discuss.  We'll meet most 
Fridays at noon at the [Wright Brothers Institute]().  Check 
[meetup](https://www.meetup.com/Dayton-Microcomputer-Association-Meetup)
to make sure we're meeting on a particular Friday.

Many people can't make that time, so join our 
[mailing list](http://lists.dma1.org/listinfo.cgi/dynamic-lang-sig-dma1.org) 
to discuss possible times for an alternative session.


## Mailing list

We have a [mailing list](http://lists.dma1.org/listinfo.cgi/dynamic-lang-sig-dma1.org) that we use for occasional discussion, but usually just monthly meeting reminders. It's extremely low traffic and definitely the best way to know what is going on with the group.

<a name="location"></a>

## Location

**CHANGE** 

We have customarily meet on the !2nd Wednesday of every month from
!7pm to !9pm in the back part of the main room at
the [Dayton Chess Club](http://www.daytonchessclub.com/).

However, the Chess Club will no longer be available on Wednesdays, 
so we'll be figuring out a new location.  For now, meet at 
Spaghetti Warehouse, just down the block.

----

Here's a [map](http://goo.gl/maps/GljT6). Sometimes parking is
hard to find, though all the metered spots are free after 6pm. If you're lucky, you can find parking on 5th street
in front of the building. There is also usually parking on a (sadly
unmarked on all of the online maps we could find) road that goes
between 4th and 5th street between Main street and Ludlow.

{% include map.html %}

<a name="post-meeting"></a>

## After-the-Meetup-Dinner

We typically walk over to the [Spaghetti Warehouse](http://www.meatballs.com/) (a few doors west of the Dayton Chess Club) for dinner & conversation after the meeting.
You're welcome to come.

<a name="past-meetings"></a>

## All Meetings

<ul>

{% for post in site.categories.meeting %}

  <li>
    <a href="{{ post.url }}">
      <h3> {{ post.title }}</h3>
    </a>
    {{post.date | date_to_string }}
  </li>

{% endfor %}

</ul>

<a name="dayton"></a>

## Dayton

Dayton is home of the [Dayton Microcomputer Association](http://dma1.org/), one of the 
country's oldest computer user groups.  DMA serves as an umbrella group for a variety of 
Special Interest Groups like ours - see 
[DMA's meetup page](http://www.meetup.com/Dayton-Microcomputer-Association-Meetup/).

The [Dayton Tech Guide](http://www.daytontechguide.com/) has links to a variety 
of resources in Dayton's technical community.
 
![Flag of Dayton](http://i0.wp.com/www.gemcityhilltop.org/wp-content/uploads/2012/12/Dayton-Flag.jpg?fit=300%2C225)
