import * as SecureStore from 'expo-secure-store'

export const PHASES_STORE_KEY = 'phases'
export const RANDOM_FACT_URL = 'https://uselessfacts.jsph.pl/random.json'

export const getJsonFromStore = async <T>(key: string) => {
  try {
    const string = await SecureStore.getItemAsync(key)
    if (string) return JSON.parse(string) as T
  } catch (error) {
    console.log('getJsonFromStore Error:', error)
  }
  return undefined
}

export const saveJsonToStore = async <T>(key: string, value: T) => {
  await SecureStore.setItemAsync(key, JSON.stringify(value))
}
