export default {

	data: {
		name: '',
	    birthday: '',
	    type: '',
	    parent_id: 0,
	    age: 0
	},

	save(result) {
		this.data.name = result.child_name;
		this.data.type = result.child_type;
		this.data.parent_id = result.user_id;
		this.data.age = result.child_birthday
	},

	get(key) {
		if (this.data[key]) {
			return this.data[key]
		}
	}
}