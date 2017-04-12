import child from './child';

export default {
    
    data: {
        id: 0,
        name: '',
        email: '',
        type: '',
        child: null,
        password: '',
        status: '',
    },

    save(result) {
        this.data.id = result.user_id;
        this.data.name = result.name;
        this.data.status = result.activation;

        // normally added during registration
        if (result.email) {
            this.data.email = result.email;    
        }

        if (result.password) {
            this.data.password = result.password;    
        }

        if (result.parent_type) {
            this.data.type = result.parent_type;    
        }

        if (result.child_name) {
            this.addChild(result)
        }
        
        console.log(this.data);
    },
    
    addChild (result) {
        child.save(result);

        if (child.data.name) {
            this.data.child = child;
        }
    },

    loadFromCache (item) {
        this.data = item.data;
    },

    get(key) {
        if (this.data[key]) {
            return this.data[key]
        }
    },

    hasChild() {
        if (this.data.child && this.data.child.get('name')) {
            return true;
        }

        return false;
    }
}