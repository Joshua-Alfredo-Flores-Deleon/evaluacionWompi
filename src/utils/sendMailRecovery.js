const HTMLRecoveryEmail = (code) => {
    return `
        <div>
            <h1>Password Recovery<h1/>
            <p>Hello, we received a request to reset your pasword, use the verification code below to proceed:<p/>
            <div>${code}<div/>
            <p>This code is valid for the next 15 minutes, If you dident request this email, you can safely ignore it<p/>
            <footer>If you need further assistance, please contact aout suppoirt teamt at 
                <a href="malitosupport@example.com">
                support@example.com
                <a/>
            <footer/>
        <div/>
    `;
}

export default HTMLRecoveryEmail;