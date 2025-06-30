/**
 * The event manager
 */
class EventManager{
    /**
     * Constructor function
     */
    constructor() {
        this.subscribers={}
    }

    /**
     * Adds a subscriber to the subscriber map
     * @param name The name of the new subscriber
     * @param subscriber The new subscriber
     */
    subscribe(name, subscriber){
        this.subscribers[name]=subscriber;
    }

    /**
     * Unsubscribes a subscriber
     * @param name The name of the subscriber
     */
    unsubscribe(name){
        this.subscribers=null;
    }

    /**
     * Notifies an event to a subscriber
     * @param subscriber The subscriber name
     * @param data The data
     */
    async notify(subscriber, data){
        if(data.isAsync!=undefined && data.isAsync)
            await this.subscribers[subscriber](data);
        else
            this.subscribers[subscriber](data);
    }
}export default EventManager;