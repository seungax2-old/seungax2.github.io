const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.[contenthash].js",
		path: path.resolve(__dirname, "../build")
	},
	mode: "production",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: "/node_modules",
				use: ["babel-loader"]
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
						options: { minimize: true }
					}
				]
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"]
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
			},
			{
				// write image files under 10k to inline or copy image files over 10k
				test: /\.(jpg|jpeg|gif|png|svg|ico)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							fallback: 'file-loader',
							name: 'images/[name].[ext]',
						},
					},
				],
			},
			{
				// write files under 10k to inline or copy files over 10k
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							fallback: 'file-loader',
							name: 'fonts/[name].[ext]',
						},
					},
				],
			},
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./public/index.html",
			filename: "index.html"
		}),
		new MiniCssExtractPlugin({
			filename: "style.css"
		}),
		new CleanWebpackPlugin()
	]
};