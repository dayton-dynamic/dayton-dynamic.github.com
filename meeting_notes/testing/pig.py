def latin(english):
    english = file_text(english)
    result = english[1:] + english[0] + 'ay'
    return result

def file_text(file_obj):
    try:
        return file_obj.read()
    except:
        return file_obj
