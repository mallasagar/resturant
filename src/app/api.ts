// api.constants.ts
const  accessToken:string='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkVNUC1TVFItMDAwMDEtMDAwMDEiLCJyb2xlIjoiQWRtaW4iLCJSb2xlSWQiOiIxIiwiRGlzcGxheU5hbWUiOiJ0ZXN0IDEiLCJVc2VyTmFtZSI6InRlc3RAZ21haWwuY29tIiwiT3V0bGV0SWQiOiI4IiwiRmlzY2FsWWVhciI6IjA3OS84MCIsIkZpc2NhbFllYXJTdGFydERhdGUiOiIxLzEvMjAyMyAxMjowMDowMCBBTSIsIkZpc2NhbFllYXJFbmREYXRlIjoiMTIvMzEvMjAyNCAxMjowMDowMCBBTSIsIlN0b3JlSWQiOiJTVFItMDAwMDEiLCJTdG9yZU5hbWUiOiJTaXRhIEZ1ZWwgQ2VudGVyIiwiU3RvcmVWQVRObyI6IjUwMDA4NjIxMiIsIlN0b3JlVHlwZSI6InJlc3RhdXJhbnQiLCJJc1N0b3JlVXNlciI6IlRydWUiLCJJc1N1cGVyQWRtaW4iOiJGYWxzZSIsIlN1YnNjcmlwdGlvblR5cGUiOiJUcmlhbCIsIlN1YnNjcmlwdGlvbkV4cGlyeURhdGUiOiIyMDI0LTA1LTIzIiwiSXNTdWJzY3JpcHRpb25FeHBpcmVkIjoiRmFsc2UiLCJuYmYiOjE3MDU5ODg5MzcsImV4cCI6MTcwNjAzMzY5OSwiaWF0IjoxNzA1OTg4OTM3fQ.2yzU507CRIpio0bSKHU38HfGv7bpWmV_6G7FWk8AX_I'
export const API_BASE_URL = 'https://api-dev.hamrosan.com/api';
export const API_Headers={
  'Authorization': `Bearer ${accessToken}`,
    'X-Secret-Key': 'titxmAgBaeCZ4GTtoCa8JjTMLQ7RX4lolmNPquR+fTkHxGXfpSgd246ofGXVP+BDMWm8wtTq4uqoeqDS9e3+ezpPNJHT8d07RpMlUgv3Z7jW/bAOoUTHLzJV6a8oatOMMDmS/SkGFtdRcs50+WPGW9umLhdEw8zkLKOPpfO2prgdueTTJ7YfiuHeE2kAa/w3',
    'Content-Type': 'application/json; odata.metadata=minimal; odata.streaming=true; charset=utf-8'
}

export const API_ENDPOINTS = {
  menu: 'item?$count=true&$filter=IsMenuItem eq true&$expand=ItemPrices($select=SalesPrice)&$select=Name,Image,DisplayOrder,CategoryId,ItemPrices,Id',
  category:'Category?$filter=IsMenuCategory eq true&$select=Name,Id,ParentId,GroupName'
};