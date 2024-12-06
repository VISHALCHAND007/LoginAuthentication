import {ID, Client, Account, AppwriteException} from 'appwrite'
import Config from 'react-native-config'

//dependencies
import Snackbar from 'react-native-snackbar'

const appWriteClient = new Client()

const APP_Write_Project_ID: string = Config.APP_Write_Project_ID!
const  APP_WRITE_API_ENDPOINT: string = Config.APP_WRITE_API_ENDPOINT!

type CreateUserAccount = {
    name: string, 
    password: string, 
    email: string
}
type LoginUserAccount = {
    email: string, 
    password: string
}

class AppWriteService {
    account

    constructor() {
        appWriteClient
        .setEndpoint(APP_WRITE_API_ENDPOINT)
        .setSession(APP_Write_Project_ID)

        this.account = new Account(appWriteClient)
    }

    async createAccount({name, email, password}: CreateUserAccount) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount) {
                return this.loginUserAccount({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            Snackbar.show({
                text: String(error), 
                duration: Snackbar.LENGTH_LONG
            })
            console.log("App write service :: createAccount() ::" + error)
            
        }
    }

    async loginUserAccount({email, password}: LoginUserAccount) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            Snackbar.show({
                text: String(error), 
                duration: Snackbar.LENGTH_LONG
            })
            console.log("App write service :: loginUserAccount() ::" + error)
            
        }
    } 

    async getUserDetails() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("App write service :: getUserDetails() ::" + error)
        }
    }

    async logout() {
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log("App write service :: logout() ::" + error)
        }
    }
}

export default AppWriteService
