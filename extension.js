module.exports = {
    "name": "ILTExample",
    "publisher": "ILT",
    "cards": [{
        "type": "ILTExampleCard",
        "source": "./src/cards/ILTExampleCard",
        "title": "ILTExample Card",
        "displayCardType": "ILTExample Card",
        "description": "This is an introductory card to the Ellucian Experience SDK",
        "pageRoute": {
            "route": "/",
            "excludeClickSelectors": ['a']
        }
    }],
    "page": {
        "source": "./src/page/router.jsx"
    }
}