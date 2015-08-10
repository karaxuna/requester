angular.module(module.name).factory(current.name, [
    function () {
        return {
            parse: function (text) {
                var tags = [];
                var sym;
                var i = 0;
                var endIndex;

                while (sym = text[i]) {
                    if (text.substring(i, i + 4) === 'http') {
                        endIndex = text.indexOf(' ', i);
                        endIndex = endIndex === -1 ? text.length : endIndex;

                        tags.push({
                            type: 'link',
                            value: text.substring(i, endIndex)
                        });
                        i = endIndex;
                    } else {
                        tags.push({
                            type: 'char',
                            value: sym
                        });
                        i++;
                    }
                }

                return this.buildHtml(tags);
            },

            buildHtml: function (tags) {
                return tags.reduce(function (html, tag) {
                    switch (tag.type) {
                        case 'link':
                        return html + '<a href="' + tag.value + '" target="_blank">' + tag.value + '</a>';
                        case 'char':
                        return html + tag.value;
                    }
                }, '');
            }
        };
    }
]);