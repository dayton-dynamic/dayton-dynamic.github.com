---
layout: default
---

# Welcome to DDL!

## About Us

We're a group of Dayton-area programmers who help each other learn how to 
write in dynamic languages.  We're casual, inquisitive, 
beginner-friendly, and include both professionals and amateurs.  
If you're interested in Ruby (including Rails), Python (including Django), 
PHP, Perl, Javascript, Scheme, Lisp, Smalltalk, etc, this is the place
for you.  Now and then we poke into other languages, too, particularly 
if they seem interesting and exciting. 

We're responsive and informal; if there's a topic you'd like to present 
on or just like to see, we'll probably be interested in it too!

We are a Special Interest Group (SIG) of the [Dayton Microcomputer 
Association](http://dma1.org/).  See other DMA SIG meetings
at [Meetup](https://www.meetup.com/dayton-microcomputer-association-meetup/events/).

## Upcoming Meetings

Our monthly meetings take place at Dayton's [Innovation Hub](https://www.thehubdayton.com/),
but we also use the "General" voice channel 
of the [PyFri Discord](https://discord.gg/9SgTh3T), so if you aren't 
fully vaccinated or can't make it downtown for any other reason, feel 
free to join us online.

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

*time change to 2 PM*

Together with [Tec^Edge](http://wbi-icc.com/centers-services/tecedge-icc), 
we're having an informal weekly lunchtime meeting
for folks learning Python.  No program, just come to share questions with each 
other, show off what you've been working on, and discuss.  We meet most 
Fridays at *2 PM* (changed from noon!), barring holidays.

For now, PyFri meets online in the "General" voice channel 
of the [PyFri Discord](https://discord.gg/9SgTh3T).  Once things are 
back to normal, we'll return to meeting at the 
[Wright Brothers Institute](https://www.wbi-innovates.com/).  Check 
[meetup](https://www.meetup.com/Dayton-Microcomputer-Association-Meetup)
to make sure we're meeting on a particular Friday.

Calendar link:
https://calendar.google.com/event?action=TEMPLATE&tmeid=NDZzamEwb2lhZzRkYjk0Zml2dDM4cjdwb2kgY2F0aGVyaW5lLmRldmxpbkBt&tmsrc=catherine.devlin%40gmail.com

### PyFri notebooks 

Some Jupyter notebooks from our Friday sessions are posted at [https://github.com/dayton-dynamic/pyfri](https://github.com/dayton-dynamic/pyfri)

## Mailing list

We have a [mailing list](http://lists.dma1.org/listinfo.cgi/dynamic-lang-sig-dma1.org) that we use for occasional discussion, but usually just monthly meeting reminders. It's extremely low traffic and definitely the best way to know what is going on with the group.

<a name="location"></a>

## Location

**New home!** 

We meet meet on the !2nd Wednesday of every month from
7 to 9 pm at Dayton's [Innovation Hub](https://www.thehubdayton.com/)

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
