export default {

	data: {
		name: '',
	    birthday: '',
	    type: '',
	    parent_id: 0,
	    age: 0,
	    image: ''
	},

	save(result) {
		this.data.name = result.child_name;
		this.data.type = result.child_type;
		this.data.parent_id = result.user_id;
		this.data.birthday = result.child_birthday;
		this.data.age = 8; // sample value
		this.data.image = result.child_avatar;
	},

	get(key) {
		if (this.data[key]) {
			return this.data[key]
		}
	},

	loadFromCache(item)
	{
		this.data = item.data;
	},

	setImage(url) {
		this.data.image = url;
	}

}