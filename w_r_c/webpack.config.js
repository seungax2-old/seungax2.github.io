const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//사용안하는 파일을 자동으로 삭제
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname + "/build")
	},
	//자동빌드 -> package.json에 start": "webpack-dev-server --hot",
	devServer: {
		contentBase: path.resolve("./build"),
		index: "index.html",
		port: 9000
	},
	mode: "none",
	module: {
		//use에 있는 loader 순서는 오른쪽에서 왼쪽 순서로 실행
		//ex) css-loader로 css 파일을 읽고 MniCssExtractPlugin.loader로 읽은 CSS를 파일로 추출
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: "/node_modules",
				use: ['babel-loader'],
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader", // html 파일을 읽었을 때 html-loader를 실행하여 웹팩이 이해할 수 있게함
						options: { minimize: false } // 코드 최적화 옵션 minimize: true(한줄로 나옴) false(줄바꿈됨) 
					}
				]
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'] //MiniCssExtractPlugin.loader:css 추출
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './public/index.html', // public/index.html 파일을 읽는다.
			filename: 'index.html' // output으로 출력할 파일은 index.html 이다.
		}),
		new MiniCssExtractPlugin({
			filename: 'style.css'
		}),
		new CleanWebpackPlugin({}),
	]
};