!function(s,c,o){var e,i=s([]),n=s.resize=s.extend(s.resize,{}),h="setTimeout",r="resize",a=r+"-special-event",u="delay",d="throttleWindow";n[u]=250,n[d]=!0,s.event.special[r]={setup:function(){if(!n[d]&&this[h])return!1;var t=s(this);i=i.add(t),s.data(this,a,{w:t.width(),h:t.height()}),1===i.length&&function t(){e=c[h](function(){i.each(function(){var t=s(this),e=t.width(),i=t.height(),n=s.data(this,a);e===n.w&&i===n.h||t.trigger(r,[n.w=e,n.h=i])}),t()},n[u])}()},teardown:function(){if(!n[d]&&this[h])return!1;var t=s(this);i=i.not(t),t.removeData(a),i.length||clearTimeout(e)},add:function(t){if(!n[d]&&this[h])return!1;var r;function e(t,e,i){var n=s(this),h=s.data(this,a);h.w=e!==o?e:n.width(),h.h=i!==o?i:n.height(),r.apply(this,arguments)}if(s.isFunction(t))return r=t,e;r=t.handler,t.handler=e}}}(jQuery,this),jQuery.plot.plugins.push({init:function(e){function i(){var t=e.getPlaceholder();0!=t.width()&&0!=t.height()&&(e.resize(),e.setupGrid(),e.draw())}e.hooks.bindEvents.push(function(t,e){t.getPlaceholder().resize(i)}),e.hooks.shutdown.push(function(t,e){t.getPlaceholder().unbind("resize",i)})},options:{},name:"resize",version:"1.0"});