function Contact() {
    return (
        <div className="flex flex-col">

            <div>
                <h1 className="text-gray-700 text-shadow-black text-center m-3 text-4xl">Hurry! Quickly Notify Us</h1>
            </div>

            <div className="ml-100 mr-100 pt-5 border-2 rounded-2xl border-gray-100 bg-gray-50 shadow-md ">
                <div className="items-start flex flex-col m-3">
                    <label className="text-gray-800 text-xl ">Your Email</label>
                    <input type="text" placeholder="name@gmail.com" className="pt-1 text-xl text-gray-600 pl-2 border-solid border-1 w-full bg-gray-100 rounded-lg border-gray-300" name="email" />
                </div>

                <div className="items-start flex flex-col m-3">
                    <label className="text-gray-800 text-xl">Subject</label>
                    <input type="text" placeholder="let us know how we help you" className="pt-1 text-gray-600 pl-2 text-xl border-solid border-1 w-full bg-gray-100 rounded-lg border-gray-300" name="subject" />
                </div>

                <div className="items-start flex flex-col m-3">
                    <label className="text-gray-800 text-xl ">Your Message</label>
                    <textarea
                        placeholder="your message..."
                        className="w-full h-40 px-4 py-3 text-gray-600 pl-2 text-xl border-solid border-1  bg-gray-100 rounded-lg border-gray-300"
                    />
                </div>

                <div className="items-start flex flex-col m-3">
                    <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-800 focus:ring-2 focus:ring-blue-600 transition">Submit</button>
                </div>
            </div>


        </div>
    )
}

export default Contact