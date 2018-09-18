const path = require('path');

module.exports = {
    mode: "development",
    entry: "./www/app/main.js", //入口
    output: {
        path: path.resolve(__dirname, "./www/dist"), //路径
        filename: "bundle.js" //文件名
    },
    module: {
        rules: [
            {   
                //检测以什么拓展名结尾
                test: /\.jsx?$/,
                //包含什么文件夹
                include: [
                    path.resolve(__dirname, "www/app")
                ],
                //不包含什么文件夹
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: "babel-loader",
                options: {
                    presets: ["env","react"],
                    plugins: ["transform-object-rest-spread","transform-runtime"]
                }
            },
            {
                test: /\.less$/,
                include: [
                    path.resolve(__dirname, "www/app")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader", options: {
                            noIeCompat: true
                        }
                    }
                ]
            }
        ]
    },
    watch: true
}