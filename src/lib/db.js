const { name, password } = process.env;

export const connectionstr = `mongodb+srv://${name}:${password}@cluster0.wmh2w.mongodb.net/productDB?retryWrites=true&w=majority&appName=Cluster0`;
