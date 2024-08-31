export const TCs = () => {
    const conditions = [
        {
          "title": "Free Use",
          "description": "Our platform is currently available for free, allowing you to translate text and documents in multiple languages without any charges."
        },
        {
          "title": "Data Privacy",
          "description": "We do not collect or store any of your personal data. Your use of the service is completely anonymous."
        },
        {
          "title": "No Misuse",
          "description": "While we encourage you to make the most of LanguageAI, we strongly recommend not misusing the service. Any inappropriate or malicious use is strictly prohibited."
        },
        {
          "title": "Accuracy",
          "description": "LanguageAI aims to provide accurate translations; however, it is important to acknowledge that errors or inaccuracies may occur. We do not assume liability for any incorrect translations or the consequences thereof."
        },
        {
          "title": "Changes to the Service",
          "description": "LanguageAI reserves the right to modify or discontinue any aspect of the service at any time without prior notice."
        }
      ]
    return (
        <div className="max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold">Terms & Conditions</h3>
            <p className="my-2">Welcome to LanguageAI! By using our services, you agree to the following terms:</p>
            <ol className="space-y-1.5">{conditions.map((condition, idx)=> (
                <li key={idx}><strong>{idx+1}. {condition.title}:&nbsp;</strong>{condition.description}</li>
            ))}</ol>
        </div>
    )
}