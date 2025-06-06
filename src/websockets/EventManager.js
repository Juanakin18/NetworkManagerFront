class EventManager{
    constructor() {
        this.subscribers={}
    }
    subscribe(name, subscriber){
        this.subscribers[name]=subscriber;
    }
    unsubscribe(name){
        this.subscribers=null;
    }
    async notify(subscriber, data){
        if(data.isAsync!=undefined && data.isAsync)
            await this.subscribers[subscriber](data);
        else
            this.subscribers[subscriber](data);
    }
}export default EventManager;