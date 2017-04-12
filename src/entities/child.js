export default {

	data: {
		name: '',
	    birthday: '',
	    type: '',
	    parent_id: 0
	},

	save(result) {
		this.data.name = result.child_name;
		this.data.type = result.child_type;
		this.data.parent_id = result.user_id;
	}
}