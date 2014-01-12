window.Service = Backbone.Model.extend({
	
});

window.Services = Backbone.Collection.extend({
	model: Service	
});

window.ServiceItem = Backbone.View.extend({
	tagName: 'tr',
	template: _.template($('#tmpl_service_item').html()),
	
	events: {
		'click' : 'itemClick'
	},
	
	render: function() {
		var tmpl = this.template(this.model.toJSON());
		$(this.el).html(tmpl);
		return this;
	}
});

window.ServiceList = Backbone.View.extend({
	el: $('#target'),
	template: _.template($('#tmpl_service_list').html()),
	
	initialize: function() {
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
		this.views = [];
	},
	
	render: function() {
		var tmpl = this.template();
		$(this.el).html(tmpl);
		this.removeAll();
	},
	
	addOne: function(item) {
		var view = new ServiceItem({
			model: item	
		});
		
		this.views.push(view);
		this.$('tbody').append(view.render().el);
	}, 
	
	addAll: function() {
		this.render();
		this.collection.each(this.addOne, this);	
	},
	
	removeAll: function() {
		if(this.views.length) {
			_.each(this.views, function(item) {
				item.remove();	
			});
			
			this.views.length = 0;
		}
	}
});
