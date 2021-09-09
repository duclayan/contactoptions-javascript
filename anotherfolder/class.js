//jshint esnext:true
export default class contact {
    constructor(name,email,free,vip){
        this.firstName = name.replace(/[\W]*\S+[\W]*$/, '');
        this.lastName = name.split(" ").splice(-1)[0];
        this.introsOffered = {vip: vip, free:free}
        this.contactOption = 'free'
        this.email = email;
    }
}
// Holds collection of contats,properties and functions of the group
export default class contactOptions {
    constructor(){
        this.contactOptions = []
    }

    newContact(name, email,free,vip){
        let x = new contact(name,email,free,vip);
        this.contactOptions.push(x)
        return x
    }

    get sortedFamilyName() {
        let current = this.contactOptions
        return (current.sort(function(a, b){
            if(a.lastName < b.lastName) { return -1; }
            if(a.lastName > b.lastName) { return 1; }
            return 0;
        }))
    }

    get sortedFirstName() {
        let current = this.contactOptions
        return (current.sort(function(a, b){
            if(a.firstName < b.firstName) { return -1; }
            if(a.firstName > b.firstName) { return 1; }
            return 0;
        }))
    }

    get update() {
        let vip_offer = this.contactOptions[0]
        vip_offer.contactOption = 'VIP'

      this.contactOptions.forEach(function(item){
          // Calculate rank score
          item.rankScore = 3 + item.introsOffered.free + item.introsOffered.vip
          // Calculate rank score by email address
          let email = item.email.split("@")

          //check whether email is unique
          let isEmailUnique = true
          switch(email[1]){
            case 'gmail.com':
            case 'hotmail.com':
            case 'outlook.com':
              isEmailUnique = false;
          }
        
          //increment + 2 when email is unique
          if (isEmailUnique == true){
           item.rankScore +=2
          }
        
          // Sort to find VIP
          // initialize a temporary holder of VIP

          if (item.introsOffered.vip == 0 && vip_offer.rankScore < item.rankScore) {
            vip_offer.contactOption = 'free'
            item.contactOption = 'VIP'
            vip_offer = item
          }
      })
        return this.contactOptions
    }
}

let contacts = new contactOptions()
contacts.newContact("John Doe", "john@brdg.app",0,14);
contacts.newContact("Billy Ray Jenkins", "bily.jenkins@gmail.com",6,0)
contacts.newContact("Jenny Baggins", "jeni@x.com",5,1)
contacts.newContact("Lloyd Banks", "lloyd@banks.com",0,0)
contacts.newContact("BA Lewis", "ba.lewis@outlook.com",8,0)
contacts.newContact("John Johnson", "jj@z.com",4,0)
contacts.newContact("Adam Johnson", "aj@z.com",4,0)
contacts.newContact("Joey Simpson", "joey@hotmail.com",9,1)
contacts.newContact("Penny Smith", "penny@smith.com",2,0)


// Get the total scores
console.log(contacts.update)
// Order by FirstName
console.log(contacts.sortedFirstName)
// Order by LastName
console.log(contacts.orderbyFamilyName)




