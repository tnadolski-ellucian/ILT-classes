module.exports = {
    "name": "ILTExample2",
    "publisher": "Sample",
    "cards": [{
        "type": "ILTExampleCard2",
        "source": "./src/cards/ILTExampleCard",
        "title": "ILTExample Card2",
        "displayCardType": "ILTExample Card2",
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