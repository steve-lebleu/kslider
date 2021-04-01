# jQuery slider plugin

[![jQuery](https://img.shields.io/badge/jQuery-3.1-blue)](https://www.typescriptlang.org/)
![Requires.io (branch)](https://img.shields.io/requires/github/konfer-be/kslider/master)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/konfer-be/kslider)
[![GPL Licence](https://badges.frapsoft.com/os/gpl/gpl.svg?v=103)](https://opensource.org/licenses/gpl-license.php)

Simple jQuery slider plugin.
        
## > Demo

https://demo.konfer.be/kslider/

## > Install

``` bash 
> $ npm i kslider --save
```
## > How to use ?

In your HTML page, between <head> tags, retrieve styles:

``` html 
<link href="path_to_kslider_css" rel="stylesheet" type="text/css" />
```

In your HTML page, between <head> tags, retrieve jQuery and kslider :

``` html 
<script src="directory_of_your_jquery/jquery.js"></script>
<script src="directory_of_your_completer/jquery.kslider.js"></script>
```

Into your HTML code, place the following code and replace/add your own images :

``` html 
<div id="kslider-wrapper" class="kslider-wrapper">
    <ul class="kslider">
        <li class="active"><img src="img/item-1.jpg" alt="Damned, pirates are in the square" /></li>
        <li><img src="img/item-2.jpg" alt="Light rays penetrating the forest" /></li>
        <li><img src="img/item-3.jpg" alt="Mountains on the horizon" /></li>
        <li><img src="img/item-4.jpg" alt="Sunset on a lake" /></li>
    </ul>
</div>
```
 
Invoke the plugin :

``` javascript
$('.kslider').kslider({});
```

## > Options

Following options are available:

* **animationSpeed**: int, speed of the animation (ms)
* **pause**: int, duration of one slide transition (ms)
* **navigation**: boolean, using navigation
* **description**: boolean, display alt attribute as description
* **beforeDisplay**: function(e, hiddenElement), function, callback fired before display of image
* **afterDisplay**: function(e, visibleElement), function, callback fired after display of image
                
## > Licence

[GPL](https://opensource.org/licenses/gpl-license.php())