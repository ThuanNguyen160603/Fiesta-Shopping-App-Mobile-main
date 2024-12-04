 import {STRIPE_SECRET_KEY} from '@env'
export const stripe = require('stripe')(STRIPE_SECRET_KEY);



